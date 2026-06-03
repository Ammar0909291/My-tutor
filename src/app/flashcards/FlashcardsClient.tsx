'use client'

import { useState, useEffect } from 'react'

interface Flashcard {
  id: string
  question: string
  answer: string
  topic: string
}

export default function FlashcardsClient() {
  const [cards, setCards] = useState<Flashcard[]>([])
  const [loading, setLoading] = useState(true)
  const [current, setCurrent] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [done, setDone] = useState<string[]>([])
  const [allDone, setAllDone] = useState(false)

  useEffect(() => {
    fetch('/api/flashcards')
      .then((r) => r.json())
      .then((data) => { setCards(data.cards ?? []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  async function handleAnswer(remembered: boolean) {
    const card = cards[current]
    if (!card) return

    await fetch('/api/flashcards', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: card.id, remembered }),
    })

    const newDone = [...done, card.id]
    setDone(newDone)
    setFlipped(false)

    if (current + 1 >= cards.length) {
      setAllDone(true)
    } else {
      setCurrent((c) => c + 1)
    }
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-base)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Загрузка карточек...</p>
      </div>
    )
  }

  if (cards.length === 0) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-base)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16, textAlign: 'center', padding: 40 }}>
        <div style={{ fontSize: 50 }}>🎉</div>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)' }}>Нет карточек для повторения сегодня</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Пройди урок чтобы получить новые карточки</p>
        <a href="/learn" style={{ padding: '12px 24px', borderRadius: 12, background: '#F78166', color: '#fff', textDecoration: 'none', fontWeight: 700 }}>
          Начать урок
        </a>
        <a href="/dashboard" style={{ color: 'var(--text-secondary)', fontSize: 13 }}>На главную</a>
      </div>
    )
  }

  if (allDone) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-base)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16, textAlign: 'center', padding: 40 }}>
        <div style={{ fontSize: 50 }}>🏆</div>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)' }}>Все карточки повторены! Отличная работа</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>+{done.length * 2} XP заработано</p>
        <a href="/dashboard" style={{ padding: '12px 24px', borderRadius: 12, background: '#F78166', color: '#fff', textDecoration: 'none', fontWeight: 700 }}>
          На главную
        </a>
      </div>
    )
  }

  const card = cards[current]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ background: 'rgba(13,17,23,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border-default)', padding: '0 20px', height: 60, display: 'flex', alignItems: 'center', gap: 12, position: 'sticky', top: 0, zIndex: 50 }}>
        <a href="/dashboard" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 14 }}>← Назад</a>
        <span style={{ fontSize: 20 }}>🃏</span>
        <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 16 }}>Карточки</span>
        <span style={{ marginLeft: 'auto', color: 'var(--text-secondary)', fontSize: 13 }}>
          {done.length} из {cards.length} карточек
        </span>
      </div>

      {/* Progress bar */}
      <div style={{ height: 3, background: 'var(--bg-surface)' }}>
        <div style={{ height: '100%', width: `${(done.length / cards.length) * 100}%`, background: '#56D364', transition: 'width 0.3s' }} />
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <div style={{ maxWidth: 560, width: '100%' }}>
          {/* Topic */}
          <div style={{ textAlign: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: 11, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{card.topic}</span>
          </div>

          {/* Card */}
          <div
            onClick={() => !flipped && setFlipped(true)}
            style={{
              padding: 32,
              borderRadius: 24,
              background: 'var(--bg-surface)',
              border: `1px solid ${flipped ? 'rgba(121,192,255,0.3)' : 'var(--border-default)'}`,
              cursor: flipped ? 'default' : 'pointer',
              minHeight: 200,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              transition: 'border-color 0.3s',
              marginBottom: 24,
            }}
          >
            {!flipped ? (
              <>
                <p style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.5, marginBottom: 20 }}>
                  {card.question}
                </p>
                <button
                  onClick={() => setFlipped(true)}
                  style={{ padding: '10px 24px', borderRadius: 10, background: 'rgba(121,192,255,0.1)', border: '1px solid rgba(121,192,255,0.3)', color: '#79C0FF', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
                >
                  Показать ответ
                </button>
              </>
            ) : (
              <p style={{ fontSize: 16, color: 'var(--text-primary)', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
                {card.answer}
              </p>
            )}
          </div>

          {/* Answer buttons */}
          {flipped && (
            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={() => handleAnswer(false)}
                style={{ flex: 1, padding: '14px', borderRadius: 14, background: 'rgba(247,129,102,0.1)', border: '1px solid rgba(247,129,102,0.3)', color: '#F78166', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}
              >
                Забыл ✗
              </button>
              <button
                onClick={() => handleAnswer(true)}
                style={{ flex: 1, padding: '14px', borderRadius: 14, background: 'rgba(86,211,100,0.1)', border: '1px solid rgba(86,211,100,0.3)', color: '#56D364', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}
              >
                Помню ✓
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
