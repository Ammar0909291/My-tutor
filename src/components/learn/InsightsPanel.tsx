'use client'
import { useCallback, useEffect, useState } from 'react'
import { X, Loader2, TrendingUp, TrendingDown, Minus, Target, BookOpen, Brain } from 'lucide-react'
import { useLanguage } from '@/components/ui/LanguageToggle'

interface KnowledgeGap {
  topicSlug: string
  mistakeCategory: string
  frequency: number
}

interface CategoryStat {
  category: string
  count: number
  pct: number
}

interface AnalysisData {
  categories: CategoryStat[]
  gaps: KnowledgeGap[]
  recommendedDifficulty: 1 | 2 | 3
  recommendedFocusCategories: string[]
  recentScores: number[]
  avgScore: number | null
  sessionCount: number
  totalMistakes: number
  allCategories: string[]
}

interface ProfileInsight {
  id: string
  icon: string
  message: string
  kind: 'level' | 'strength' | 'weakness' | 'style' | 'pace' | 'focus'
  severity: 'positive' | 'info' | 'warning'
}

interface LearnerProfileData {
  hasSignal: boolean
  insights: ProfileInsight[]
}

interface Props {
  subjectSlug: string
  topicSlug?: string
  teachingLanguage?: 'ru' | 'en' | 'hi'
  onClose: () => void
  onStartTargetedPractice: (difficulty: number, focusCategories: string[]) => void
}

// Sprint AP: the panel is conditionally rendered in LessonScreen, so every
// open/close toggle remounts it and refired both fetches even when nothing
// changed. Cache responses per subject+topic for a short window — insights
// only move after a practice session, not between panel toggles.
const INSIGHTS_CACHE_TTL_MS = 60_000
const insightsCache = new Map<string, { data: AnalysisData | null; profileData: LearnerProfileData | null; expires: number }>()

// Called after a practice submission so the next panel open refetches fresh data.
export function invalidateInsightsCache() {
  insightsCache.clear()
}

function formatCategory(category: string): string {
  return category.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

export function InsightsPanel({ subjectSlug, topicSlug, onClose, onStartTargetedPractice }: Omit<Props, 'teachingLanguage'> & { teachingLanguage?: string }) {
  const { t } = useLanguage()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<AnalysisData | null>(null)
  const [profileData, setProfileData] = useState<LearnerProfileData | null>(null)

  const load = useCallback(() => {
    const cacheKey = `${subjectSlug}:${topicSlug ?? ''}`
    const cached = insightsCache.get(cacheKey)
    if (cached && cached.expires > Date.now()) {
      setData(cached.data)
      setProfileData(cached.profileData)
      setLoading(false)
      return
    }
    setLoading(true)
    const url = `/api/practice/analysis?subject=${subjectSlug}${topicSlug ? `&topic=${topicSlug}` : ''}`
    let nextData: AnalysisData | null = null
    let nextProfile: LearnerProfileData | null = null
    Promise.all([
      fetch(url).then((r) => r.json()).then((d) => { if (d.success) { nextData = d; setData(d) } }).catch(() => {}),
      fetch(`/api/learner/profile-insights?subject=${subjectSlug}`)
        .then((r) => r.json())
        .then((d) => { if (!d.error) { nextProfile = d; setProfileData(d) } })
        .catch(() => {}),
    ]).finally(() => {
      setLoading(false)
      // Only cache when at least one fetch succeeded — never cache a dead state.
      if (nextData || nextProfile) {
        insightsCache.set(cacheKey, { data: nextData, profileData: nextProfile, expires: Date.now() + INSIGHTS_CACHE_TTL_MS })
      }
    })
  }, [subjectSlug, topicSlug])

  useEffect(() => { load() }, [load])

  const scoreColor = (s: number) => s >= 80 ? 'var(--green)' : s >= 60 ? 'var(--yellow)' : 'var(--red)'
  const diffLabel = data?.recommendedDifficulty === 1 ? t('insights_diff_easy')
    : data?.recommendedDifficulty === 3 ? t('insights_diff_hard') : t('insights_diff_medium')

  // Compute trend from last 5 scores
  const trend = (() => {
    const scores = data?.recentScores?.slice(0, 5) ?? []
    if (scores.length < 3) return 'stable'
    const first = scores.slice(-2).reduce((a, b) => a + b, 0) / 2
    const last = scores.slice(0, 2).reduce((a, b) => a + b, 0) / 2
    if (last - first > 8) return 'improving'
    if (first - last > 8) return 'declining'
    return 'stable'
  })()

  const TrendIcon = trend === 'improving' ? TrendingUp : trend === 'declining' ? TrendingDown : Minus
  const trendColor = trend === 'improving' ? 'var(--green)' : trend === 'declining' ? 'var(--red)' : 'var(--text-secondary)'
  const trendLabel = trend === 'improving' ? t('insights_improving') : trend === 'declining' ? t('insights_declining') : t('insights_stable')

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 20,
      background: 'var(--bg-void)',
      display: 'flex', flexDirection: 'column',
      borderRadius: 'inherit',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        flexShrink: 0, height: 44,
        background: 'var(--bg-base)',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 14px', gap: 8,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 14, color: '#F59E0B' }}>📊</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>{t('insights_title')}</span>
          {data && (
            <span style={{ fontSize: 10, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
              {data.sessionCount} {t('insights_sessions')}
            </span>
          )}
        </div>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24, borderRadius: 6 }}>
          <X size={14} />
        </button>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 14 }}>

        {loading && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 12 }}>
            <Loader2 size={24} style={{ animation: 'spin 1s linear infinite', color: '#F59E0B' }} />
            <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{t('insights_loading')}</p>
          </div>
        )}

        {/* ── Learning Intelligence Section (Sprint R) ── */}
        {!loading && (
          <div style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
              <Brain size={12} style={{ color: '#A78BFA' }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {t('insights_learner_intel')}
              </span>
            </div>
            {!profileData?.hasSignal ? (
              <p style={{ fontSize: 11, color: 'var(--text-dim)', lineHeight: 1.6 }}>{t('insights_no_signal')}</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {(profileData?.insights ?? []).map((ins) => {
                  const borderColor = ins.severity === 'positive' ? 'rgba(63,185,80,0.25)'
                    : ins.severity === 'warning' ? 'rgba(248,81,73,0.25)' : 'rgba(167,139,250,0.2)'
                  const bgColor = ins.severity === 'positive' ? 'rgba(63,185,80,0.06)'
                    : ins.severity === 'warning' ? 'rgba(248,81,73,0.06)' : 'rgba(167,139,250,0.06)'
                  return (
                    <div key={ins.id} style={{ display: 'flex', gap: 8, padding: '8px 10px', borderRadius: 8, border: `1px solid ${borderColor}`, background: bgColor }}>
                      <span style={{ fontSize: 14, flexShrink: 0, lineHeight: '16px' }}>{ins.icon}</span>
                      <p style={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>{ins.message}</p>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {!loading && (!data || data.sessionCount === 0) && (
          <div style={{ textAlign: 'center', padding: '32px 16px' }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>📝</div>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{t('insights_no_data')}</p>
          </div>
        )}

        {!loading && data && data.sessionCount > 0 && (
          <>
            {/* Performance summary */}
            <div style={{ padding: 12, borderRadius: 10, background: 'var(--bg-base)', border: '1px solid var(--border-subtle)', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {t('insights_performance')}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <TrendIcon size={12} style={{ color: trendColor }} />
                  <span style={{ fontSize: 10, color: trendColor }}>{trendLabel}</span>
                </div>
              </div>

              {/* Score bar chart */}
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 40, marginBottom: 8 }}>
                {data.recentScores.slice(0, 7).reverse().map((score, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <div style={{ width: '100%', height: `${Math.max(4, score * 0.38)}px`, borderRadius: 3, background: scoreColor(score) }} />
                    <span style={{ fontSize: 8, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>{score}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                  {t('insights_avg')}: <span style={{ fontWeight: 700, color: data.avgScore !== null ? scoreColor(data.avgScore) : 'var(--text-dim)' }}>{data.avgScore ?? '—'}%</span>
                </span>
                <span style={{ fontSize: 10, color: 'var(--text-dim)' }}>
                  {data.totalMistakes} {t('insights_mistakes_count')}
                </span>
              </div>
            </div>

            {/* Mistake categories */}
            <div style={{ padding: 12, borderRadius: 10, background: 'var(--bg-base)', border: '1px solid var(--border-subtle)', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                <Target size={12} style={{ color: 'var(--red)' }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {t('insights_mistakes')}
                </span>
              </div>
              {data.categories.length === 0
                ? <p style={{ fontSize: 11, color: 'var(--green)' }}>{t('insights_no_mistakes')}</p>
                : data.categories.slice(0, 5).map((cat) => (
                  <div key={cat.category} style={{ marginBottom: 6 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                      <span style={{ fontSize: 11, color: 'var(--text-primary)', fontWeight: cat.pct > 30 ? 600 : 400 }}>
                        {formatCategory(cat.category)}
                      </span>
                      <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                        {cat.pct}% ({cat.count}×)
                      </span>
                    </div>
                    <div style={{ height: 4, borderRadius: 2, background: 'var(--bg-elevated)', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%', width: `${cat.pct}%`,
                        background: cat.pct > 40 ? 'var(--red)' : cat.pct > 20 ? 'var(--yellow)' : 'var(--green)',
                        borderRadius: 2, transition: 'width 400ms ease',
                      }} />
                    </div>
                  </div>
                ))}
            </div>

            {/* Knowledge gaps */}
            {data.gaps.length > 0 && (
              <div style={{ padding: 12, borderRadius: 10, background: 'var(--bg-base)', border: '1px solid var(--border-subtle)', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                  <BookOpen size={12} style={{ color: '#79C0FF' }} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {t('insights_gaps')}
                  </span>
                </div>
                {data.gaps.slice(0, 5).map((gap, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 9, color: '#79C0FF', flexShrink: 0 }}>→</span>
                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: 11, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                        {gap.topicSlug}
                      </span>
                      <span style={{ fontSize: 9, color: 'var(--text-dim)', marginLeft: 6 }}>
                        ({formatCategory(gap.mistakeCategory)})
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Recommended difficulty */}
            <div style={{ padding: 12, borderRadius: 10, background: 'var(--bg-base)', border: '1px solid var(--border-subtle)', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{t('insights_difficulty')}</span>
                <span style={{
                  fontSize: 11, fontWeight: 700, padding: '2px 10px', borderRadius: 12,
                  background: data.recommendedDifficulty === 1 ? 'rgba(63,185,80,0.12)'
                    : data.recommendedDifficulty === 3 ? 'rgba(248,81,73,0.12)'
                    : 'rgba(210,153,34,0.12)',
                  color: data.recommendedDifficulty === 1 ? 'var(--green)'
                    : data.recommendedDifficulty === 3 ? 'var(--red)'
                    : 'var(--yellow)',
                }}>
                  {diffLabel}
                </span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Footer — targeted practice button */}
      {!loading && data && data.sessionCount > 0 && (
        <div style={{ flexShrink: 0, padding: '10px 14px', borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-base)' }}>
          <button
            onClick={() => onStartTargetedPractice(data.recommendedDifficulty, data.recommendedFocusCategories)}
            style={{
              width: '100%', padding: '9px 0', borderRadius: 10, cursor: 'pointer',
              background: '#F59E0B', color: '#fff', border: 'none', fontWeight: 700, fontSize: 13,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }}>
            🎯 {t('insights_start_targeted')}
            {data.recommendedFocusCategories.length > 0 && (
              <span style={{ fontSize: 10, opacity: 0.85, fontWeight: 400 }}>
                · {data.recommendedFocusCategories.slice(0, 2).map(formatCategory).join(', ')}
              </span>
            )}
          </button>
        </div>
      )}
    </div>
  )
}
