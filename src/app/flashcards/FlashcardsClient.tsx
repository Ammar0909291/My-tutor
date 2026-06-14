'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/components/ui/LanguageToggle'
import { getTranslations } from '@/lib/i18n'

interface Flashcard {
  id: string
  question: string
  answer: string
  topic: string
}

interface Stats {
  total: number
  due: number
  studiedToday: number
}

function StatsBar({ stats, tr }: { stats: Stats; tr: ReturnType<typeof getTranslations> }) {
  const items = [
    { icon: '🗂️', label: tr.flashcards_stat_total, value: stats.total },
    { icon: '⏰', label: tr.flashcards_stat_due, value: stats.due },
    { icon: '✅', label: tr.flashcards_stat_studied, value: stats.studiedToday },
  ]
  return (
    <div style={{ display: 'flex', gap: 12, width: '100%', maxWidth: 420 }}>
      {items.map((item) => (
        <div key={item.label} style={{ flex: 1, background: 'var(--bg-surface)', border: '1px solid var(--border-default)', borderRadius: 14, padding: '14px 10px', textAlign: 'center' }}>
          <div style={{ fontSize: 20, marginBottom: 4 }}>{item.icon}</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)' }}>{item.value}</div>
          <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>{item.label}</div>
        </div>
      ))}
    </div>
  )
}

export default function FlashcardsClient() {
  const { lang } = useLanguage()
  const tr = getTranslations(lang)

  const [cards, setCards] = useState<Flashcard[]>([])
  const [stats, setStats] = useState<Stats>({ total: 0, due: 0, studiedToday: 0 })
  const [loading, setLoading] = useState(true)
  const [current, setCurrent] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [done, setDone] = useState<string[]>([])
  const [allDone, setAllDone] = useState(false)

  useEffect(() => {
    fetch('/api/flashcards')
      .then((r) => r.json())
      .then((data) => {
        setCards(data.cards ?? [])
        setStats(data.stats ?? { total: 0, due: 0, studiedToday: 0 })
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  async function handleRate(rating: 'hard' | 'medium' | 'easy') {
    const card = cards[current]
    if (!card) return

    await fetch('/api/flashcards', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: card.id, rating }),
    })

    setDone((d) => [...d, card.id])
    setFlipped(false)
    setStats((s) => ({ ...s, due: Math.max(0, s.due - 1), studiedToday: s.studiedToday + 1 }))

    if (current + 1 >= cards.length) {
      setAllDone(true)
    } else {
      setCurrent((c) => c + 1)
    }
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-base)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--text-secondary)' }}>{tr.flashcards_loading}</p>
      </div>
    )
  }

  if (stats.total === 0) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-base)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 20, textAlign: 'center', padding: 40 }}>
        <div style={{ fontSize: 50 }}>🃏</div>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', maxWidth: 420 }}>{tr.flashcards_zero_title}</h2>
        <StatsBar stats={stats} tr={tr} />
        <a href="/learn" style={{ padding: '12px 24px', borderRadius: 12, background: '#F78166', color: '#fff', textDecoration: 'none', fontWeight: 700 }}>
          {tr.flashcards_empty_cta}
        </a>
        <a href="/dashboard" style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{tr.flashcards_back_home}</a>
      </div>
    )
  }

  if (allDone) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-base)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16, textAlign: 'center', padding: 40 }}>
        <div style={{ fontSize: 50 }}>🏆</div>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)' }}>{tr.flashcards_alldone_title}</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>+{done.length * 2} {tr.flashcards_xp_earned}</p>
        <a href="/dashboard" style={{ padding: '12px 24px', borderRadius: 12, background: '#F78166', color: '#fff', textDecoration: 'none', fontWeight: 700 }}>
          {tr.flashcards_back_home}
        </a>
      </div>
    )
  }

  if (cards.length === 0) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-base)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 20, textAlign: 'center', padding: 40 }}>
        <div style={{ fontSize: 50 }}>🃏</div>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)' }}>{tr.flashcards_empty_title}</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>{tr.flashcards_empty_sub}</p>
        <StatsBar stats={stats} tr={tr} />
        <a href="/learn" style={{ padding: '12px 24px', borderRadius: 12, background: '#F78166', color: '#fff', textDecoration: 'none', fontWeight: 700 }}>
          {tr.flashcards_empty_cta}
        </a>
        <a href="/dashboard" style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{tr.flashcards_back_home}</a>
      </div>
    )
  }

  const card = cards[current]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ background: 'rgba(13,17,23,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border-default)', padding: '0 20px', height: 60, display: 'flex', alignItems: 'center', gap: 12, position: 'sticky', top: 0, zIndex: 50 }}>
        <a href="/dashboard" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 14 }}>← {tr.flashcards_back}</a>
        <span style={{ fontSize: 20 }}>🃏</span>
        <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 16 }}>{tr.flashcards_title}</span>
        <span style={{ marginLeft: 'auto', color: 'var(--text-secondary)', fontSize: 13 }}>
          {done.length} / {cards.length} {tr.flashcards_progress_label}
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
                  {tr.flashcards_show_answer}
                </button>
              </>
            ) : (
              <p style={{ fontSize: 16, color: 'var(--text-primary)', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
                {card.answer}
              </p>
            )}
          </div>

          {/* Rating buttons */}
          {flipped && (
            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={() => handleRate('hard')}
                style={{ flex: 1, padding: '14px', borderRadius: 14, background: 'rgba(247,129,102,0.1)', border: '1px solid rgba(247,129,102,0.3)', color: '#F78166', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}
              >
                {tr.flashcards_hard}
              </button>
              <button
                onClick={() => handleRate('medium')}
                style={{ flex: 1, padding: '14px', borderRadius: 14, background: 'rgba(227,179,65,0.1)', border: '1px solid rgba(227,179,65,0.3)', color: '#E3B341', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}
              >
                {tr.flashcards_medium}
              </button>
              <button
                onClick={() => handleRate('easy')}
                style={{ flex: 1, padding: '14px', borderRadius: 14, background: 'rgba(86,211,100,0.1)', border: '1px solid rgba(86,211,100,0.3)', color: '#56D364', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}
              >
                {tr.flashcards_easy}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
