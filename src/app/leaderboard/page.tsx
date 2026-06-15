'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/components/ui/LanguageToggle'
import { CandyPage, Card } from '@/components/ui/candy'

type Entry = { rank: number; userId: string; name: string; image: string | null; xp: number }

const RANK_ICON = ['🥇', '🥈', '🥉']

export default function LeaderboardPage() {
  const { t } = useLanguage()
  const [mode, setMode] = useState<'week' | 'alltime'>('week')
  const [data, setData] = useState<{ entries: Entry[]; myRank: number | null; myXP: number; week?: string } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(`/api/leaderboard?mode=${mode}`)
      .then((r) => r.json())
      .then((d) => { if (d.success) setData(d) })
      .finally(() => setLoading(false))
  }, [mode])

  return (
    <CandyPage className="p-6">
      <div className="max-w-lg mx-auto">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link href="/dashboard" className="text-sm" style={{ color: 'var(--candy-ink-soft)', textDecoration: 'none', fontWeight: 700 }}>{t('lb_back')}</Link>
          <h1 className="text-xl flex-1 text-center" style={{ fontFamily: 'var(--font-baloo2)', fontWeight: 800, color: 'var(--candy-ink)' }}>{t('lb_title')}</h1>
        </div>

        {/* Tabs */}
        <div className="flex rounded-2xl mb-6 p-1" style={{ background: 'var(--candy-card)', boxShadow: '0 4px 0 var(--candy-shadow)' }}>
          {(['week', 'alltime'] as const).map((m) => (
            <button key={m} onClick={() => setMode(m)}
              className="flex-1 py-2 text-sm rounded-xl transition-all"
              style={{
                background: mode === m ? 'var(--candy-purple)' : 'transparent',
                color: mode === m ? '#fff' : 'var(--candy-ink-soft)',
                fontWeight: 800,
                cursor: 'pointer',
                border: 'none',
              }}>
              {m === 'week' ? t('lb_this_week') : t('lb_all_time')}
            </button>
          ))}
        </div>

        {mode === 'week' && (
          <p className="text-xs text-center mb-4" style={{ color: 'var(--candy-ink-soft)', fontWeight: 600 }}>
            🔄 {t('lb_resets_monday')}
            {data?.week ? ` · ${data.week}` : ''}
          </p>
        )}

        {/* My rank */}
        {data?.myRank && (
          <Card className="flex items-center justify-between px-4 py-3 mb-4" style={{ background: 'rgba(139,92,246,0.12)' }}>
            <span className="text-sm" style={{ color: 'var(--candy-purple)', fontWeight: 800 }}>{t('lb_your_rank')}</span>
            <span className="text-sm" style={{ fontWeight: 800, color: 'var(--candy-ink)' }}>#{data.myRank} · {data.myXP} XP</span>
          </Card>
        )}

        {/* List */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-6 h-6 border-2 rounded-full animate-spin" style={{ borderColor: 'var(--candy-purple)', borderTopColor: 'transparent' }} />
          </div>
        ) : (
          <div className="space-y-2">
            {(data?.entries ?? []).map((entry) => (
              <Card key={entry.userId} className="flex items-center gap-3 px-4 py-3">
                <span className="w-8 text-center text-lg" style={{ fontWeight: 800, color: 'var(--candy-ink)' }}>
                  {entry.rank <= 3 ? RANK_ICON[entry.rank - 1] : `#${entry.rank}`}
                </span>
                {entry.image ? (
                  <img src={entry.image} alt={entry.name} className="w-8 h-8 rounded-full object-cover" />
                ) : (
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs"
                    style={{ background: 'var(--candy-purple)', color: '#fff', fontWeight: 800 }}>
                    {entry.name[0]?.toUpperCase()}
                  </div>
                )}
                <span className="flex-1 text-sm" style={{ fontWeight: 700, color: 'var(--candy-ink)' }}>{entry.name}</span>
                <span className="text-sm tabular-nums" style={{ color: 'var(--candy-purple)', fontWeight: 800 }}>{entry.xp} XP</span>
              </Card>
            ))}
            {(data?.entries ?? []).length === 0 && (
              <p className="text-center py-8 text-sm" style={{ color: 'var(--candy-ink-soft)', fontWeight: 600 }}>
                {t('lb_no_entries')}
              </p>
            )}
          </div>
        )}
      </div>
    </CandyPage>
  )
}
