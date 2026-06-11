'use client'

import { useState, useEffect, useRef } from 'react'
import { t as i18n } from '@/lib/i18n'

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

  useEffect(() => {
    fetchQuestions()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
      <div style={{ minHeight: '100vh', background: 'var(--bg-base)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
        <div style={{ fontSize: 40 }}>🎮</div>
        <p style={{ color: 'var(--text-secondary)', fontSize: 16 }}>{i18n(lang, 'quiz_loading')}</p>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-base)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
        <p style={{ color: '#F78166', fontSize: 16 }}>{error}</p>
        <button onClick={restart} style={{ padding: '10px 20px', borderRadius: 12, background: '#F78166', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 700 }}>
          {i18n(lang, 'quiz_retry')}
        </button>
        <a href="/dashboard" style={{ color: 'var(--text-secondary)', fontSize: 14 }}>{i18n(lang, 'quiz_back')}</a>
      </div>
    )
  }

  if (finished) {
    const emoji = score === 5 ? '🏆' : score >= 3 ? '💪' : '📚'
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-base)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', padding: 40, maxWidth: 400 }}>
          <div style={{ fontSize: 60, marginBottom: 16 }}>{emoji}</div>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: 'var(--text-primary)', marginBottom: 8 }}>
            {score} / {questions.length} {i18n(lang, 'quiz_finish')}
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 32, fontSize: 15 }}>
            {score === 5
              ? i18n(lang, 'quiz_perfect')
              : score >= 3
              ? i18n(lang, 'quiz_good')
              : i18n(lang, 'quiz_retry_msg')}
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={restart} style={{ padding: '12px 24px', borderRadius: 12, background: '#F78166', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 14 }}>
              {i18n(lang, 'quiz_retry')}
            </button>
            <a href="/dashboard" style={{ padding: '12px 24px', borderRadius: 12, background: 'var(--bg-surface)', color: 'var(--text-primary)', border: '1px solid var(--border-default)', textDecoration: 'none', fontWeight: 700, fontSize: 14, display: 'inline-block' }}>
              {i18n(lang, 'quiz_back')}
            </a>
          </div>
        </div>
      </div>
    )
  }

  const q = questions[current]
  const timerPct = (timeLeft / 30) * 100

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ background: 'rgba(13,17,23,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border-default)', padding: '0 20px', height: 60, display: 'flex', alignItems: 'center', gap: 12, position: 'sticky', top: 0, zIndex: 50 }}>
        <a href="/dashboard" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 14 }}>{i18n(lang, 'quiz_back')}</a>
        <span style={{ fontSize: 20 }}>🎮</span>
        <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 16 }}>{i18n(lang, 'quiz_title')}</span>
        <span style={{ marginLeft: 'auto', color: 'var(--text-secondary)', fontSize: 13 }}>
          {current + 1} / {questions.length}
        </span>
      </div>

      <div style={{ flex: 1, maxWidth: 700, margin: '40px auto', padding: '0 20px', width: '100%' }}>
        {/* Timer bar */}
        <div style={{ height: 4, borderRadius: 4, background: 'var(--bg-surface)', marginBottom: 32, overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${timerPct}%`,
            background: timeLeft <= 10 ? '#F78166' : '#56D364',
            transition: 'width 1s linear, background 0.3s',
            borderRadius: 4,
          }} />
        </div>
        <div style={{ marginBottom: 8, color: 'var(--text-dim)', fontSize: 12 }}>⏱ {timeLeft}{i18n(lang, 'quiz_seconds_suffix')}</div>

        {/* Question */}
        <div style={{ padding: '24px', borderRadius: 20, background: 'var(--bg-surface)', border: '1px solid var(--border-default)', marginBottom: 20 }}>
          <p style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.5 }}>{q.question}</p>
        </div>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {q.options.map((opt, idx) => {
            let bg = 'var(--bg-surface)'
            let border = 'var(--border-default)'
            let color = 'var(--text-primary)'
            if (selected !== null) {
              if (idx === q.correctIndex) { bg = 'rgba(86,211,100,0.15)'; border = '#56D364'; color = '#56D364' }
              else if (idx === selected) { bg = 'rgba(247,129,102,0.15)'; border = '#F78166'; color = '#F78166' }
            }
            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={selected !== null}
                style={{
                  padding: '14px 20px',
                  borderRadius: 14,
                  background: bg,
                  border: `1px solid ${border}`,
                  color,
                  textAlign: 'left',
                  fontSize: 14,
                  cursor: selected !== null ? 'default' : 'pointer',
                  fontWeight: 500,
                  transition: 'all 0.2s',
                }}
              >
                {String.fromCharCode(65 + idx)}. {opt}
              </button>
            )
          })}
        </div>

        {/* Explanation + Next */}
        {selected !== null && (
          <div style={{ marginTop: 20 }}>
            <div style={{ padding: '16px', borderRadius: 14, background: 'rgba(121,192,255,0.08)', border: '1px solid rgba(121,192,255,0.2)', marginBottom: 16 }}>
              <p style={{ fontSize: 13, color: '#79C0FF', lineHeight: 1.6 }}>💡 {q.explanation}</p>
            </div>
            <button onClick={nextQuestion} style={{ width: '100%', padding: '14px', borderRadius: 14, background: '#F78166', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 15 }}>
              {current + 1 < questions.length ? i18n(lang, 'quiz_next') : i18n(lang, 'quiz_finish')}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
