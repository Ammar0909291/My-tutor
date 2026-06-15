'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/components/ui/LanguageToggle'
import { getTranslations } from '@/lib/i18n'
import { CandyPage, Card, CandyButton, ProgressBar, EagleMascot, useConfetti } from '@/components/ui/candy'

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
        <Card key={item.label} style={{ flex: 1, padding: '14px 10px', textAlign: 'center' }}>
          <div style={{ fontSize: 20, marginBottom: 4 }}>{item.icon}</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--candy-ink)', fontFamily: 'var(--font-baloo2)' }}>{item.value}</div>
          <div style={{ fontSize: 11, color: 'var(--candy-ink-soft)', marginTop: 2, fontWeight: 600 }}>{item.label}</div>
        </Card>
      ))}
    </div>
  )
}

export default function FlashcardsClient() {
  const { lang } = useLanguage()
  const tr = getTranslations(lang)
  const fireConfetti = useConfetti()

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
      fireConfetti()
    } else {
      setCurrent((c) => c + 1)
    }
  }

  if (loading) {
    return (
      <CandyPage style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--candy-ink-soft)', fontWeight: 600 }}>{tr.flashcards_loading}</p>
      </CandyPage>
    )
  }

  if (stats.total === 0) {
    return (
      <CandyPage style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 20, textAlign: 'center', padding: 40 }}>
        <EagleMascot variant="hero" />
        <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--candy-ink)', maxWidth: 420, fontFamily: 'var(--font-baloo2)' }}>{tr.flashcards_zero_title}</h2>
        <StatsBar stats={stats} tr={tr} />
        <a href="/learn" style={{ padding: '12px 24px', borderRadius: 16, background: 'var(--candy-orange)', color: '#fff', textDecoration: 'none', fontWeight: 800, boxShadow: '0 4px 0 var(--candy-shadow)' }}>
          {tr.flashcards_empty_cta}
        </a>
        <a href="/dashboard" style={{ color: 'var(--candy-ink-soft)', fontSize: 13, fontWeight: 600 }}>{tr.flashcards_back_home}</a>
      </CandyPage>
    )
  }

  if (allDone) {
    return (
      <CandyPage style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16, textAlign: 'center', padding: 40 }}>
        <div style={{ fontSize: 50 }}>🏆</div>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--candy-ink)', fontFamily: 'var(--font-baloo2)' }}>{tr.flashcards_alldone_title}</h2>
        <p style={{ color: 'var(--candy-ink-soft)', fontSize: 14, fontWeight: 600 }}>+{done.length * 2} {tr.flashcards_xp_earned}</p>
        <a href="/dashboard" style={{ padding: '12px 24px', borderRadius: 16, background: 'var(--candy-green)', color: '#fff', textDecoration: 'none', fontWeight: 800, boxShadow: '0 4px 0 var(--candy-green-d)' }}>
          {tr.flashcards_back_home}
        </a>
      </CandyPage>
    )
  }

  if (cards.length === 0) {
    return (
      <CandyPage style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 20, textAlign: 'center', padding: 40 }}>
        <EagleMascot variant="hero" />
        <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--candy-ink)', fontFamily: 'var(--font-baloo2)' }}>{tr.flashcards_empty_title}</h2>
        <p style={{ color: 'var(--candy-ink-soft)', fontSize: 14, fontWeight: 600 }}>{tr.flashcards_empty_sub}</p>
        <StatsBar stats={stats} tr={tr} />
        <a href="/learn" style={{ padding: '12px 24px', borderRadius: 16, background: 'var(--candy-orange)', color: '#fff', textDecoration: 'none', fontWeight: 800, boxShadow: '0 4px 0 var(--candy-shadow)' }}>
          {tr.flashcards_empty_cta}
        </a>
        <a href="/dashboard" style={{ color: 'var(--candy-ink-soft)', fontSize: 13, fontWeight: 600 }}>{tr.flashcards_back_home}</a>
      </CandyPage>
    )
  }

  const card = cards[current]

  return (
    <CandyPage style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ background: 'var(--candy-card)', borderBottom: '1px solid var(--candy-shadow)', padding: '0 20px', height: 60, display: 'flex', alignItems: 'center', gap: 12, position: 'sticky', top: 0, zIndex: 50 }}>
        <a href="/dashboard" style={{ color: 'var(--candy-ink-soft)', textDecoration: 'none', fontSize: 14, fontWeight: 700 }}>← {tr.flashcards_back}</a>
        <span style={{ fontSize: 20 }}>🃏</span>
        <span style={{ fontWeight: 800, color: 'var(--candy-ink)', fontSize: 16, fontFamily: 'var(--font-baloo2)' }}>{tr.flashcards_title}</span>
        <span style={{ marginLeft: 'auto', color: 'var(--candy-ink-soft)', fontSize: 13, fontWeight: 600 }}>
          {done.length} / {cards.length} {tr.flashcards_progress_label}
        </span>
      </div>

      {/* Progress bar */}
      <ProgressBar percent={(done.length / cards.length) * 100} height={6} borderRadius={0} fillColor="var(--candy-green)" animated={false} />

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <div style={{ maxWidth: 560, width: '100%' }}>
          {/* Topic */}
          <div style={{ textAlign: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: 11, color: 'var(--candy-ink-soft)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>{card.topic}</span>
          </div>

          {/* Card */}
          <Card
            onClick={() => !flipped && setFlipped(true)}
            style={{
              padding: 32,
              cursor: flipped ? 'default' : 'pointer',
              minHeight: 200,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              marginBottom: 24,
            }}
          >
            {!flipped ? (
              <>
                <p style={{ fontSize: 18, fontWeight: 800, color: 'var(--candy-ink)', lineHeight: 1.5, marginBottom: 20 }}>
                  {card.question}
                </p>
                <CandyButton
                  onClick={() => setFlipped(true)}
                  style={{ padding: '10px 24px', borderRadius: 12, background: 'rgba(59,158,255,0.12)', color: 'var(--candy-blue)', fontSize: 13, fontWeight: 800 }}
                  depth={3}
                >
                  {tr.flashcards_show_answer}
                </CandyButton>
              </>
            ) : (
              <p style={{ fontSize: 16, color: 'var(--candy-ink)', lineHeight: 1.7, whiteSpace: 'pre-wrap', fontWeight: 600 }}>
                {card.answer}
              </p>
            )}
          </Card>

          {/* Rating buttons */}
          {flipped && (
            <div style={{ display: 'flex', gap: 12 }}>
              <CandyButton
                onClick={() => handleRate('hard')}
                style={{ flex: 1, padding: '14px', borderRadius: 16, background: 'var(--candy-red)', color: '#fff', fontWeight: 800, fontSize: 15 }}
                shadowColor="#D43B3B"
              >
                {tr.flashcards_hard}
              </CandyButton>
              <CandyButton
                onClick={() => handleRate('medium')}
                style={{ flex: 1, padding: '14px', borderRadius: 16, background: 'var(--candy-yellow)', color: '#3C3B54', fontWeight: 800, fontSize: 15 }}
                shadowColor="var(--candy-yellow-d)"
              >
                {tr.flashcards_medium}
              </CandyButton>
              <CandyButton
                onClick={() => handleRate('easy')}
                style={{ flex: 1, padding: '14px', borderRadius: 16, background: 'var(--candy-green)', color: '#fff', fontWeight: 800, fontSize: 15 }}
                shadowColor="var(--candy-green-d)"
              >
                {tr.flashcards_easy}
              </CandyButton>
            </div>
          )}
        </div>
      </div>
    </CandyPage>
  )
}
