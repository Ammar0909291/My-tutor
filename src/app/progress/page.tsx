import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { withRetry } from '@/lib/db/withRetry'
import Link from 'next/link'
import { t as i18nT, type Lang } from '@/lib/i18n'

function getLevel(xp: number, lang: Lang) {
  if (xp >= 1001) return { name: i18nT(lang, 'level_master'),       color: '#F6B444', next: null }
  if (xp >= 601) return { name: i18nT(lang, 'level_expert'),        color: '#79C0FF', next: 1001 }
  if (xp >= 301) return { name: i18nT(lang, 'level_practitioner'),  color: '#56D364', next: 601 }
  if (xp >= 101) return { name: i18nT(lang, 'level_student'),       color: '#A78BFA', next: 301 }
  return { name: i18nT(lang, 'level_novice'), color: '#71717A', next: 101 }
}

export default async function ProgressPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/auth/login')

  const userId = session.user.id

  const [user, profile, recentSessions, flashcardsDue] = await withRetry(() => Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: { xpPoints: true, name: true },
    }),
    prisma.profile.findUnique({
      where: { userId },
      select: {
        streakDays: true,
        totalSessions: true,
        masteredTopics: true,
        confusedTopics: true,
        lastStudiedTopic: true,
        displayName: true,
        teachingLanguage: true,
      },
    }),
    prisma.learnSession.findMany({
      where: { userId },
      orderBy: { startedAt: 'desc' },
      take: 10,
      include: {
        subject: { select: { name: true, slug: true } },
        _count: { select: { messages: true } },
      },
    }),
    prisma.flashcard.count({ where: { userId, nextReview: { lte: new Date() } } }),
  ]))

  const lang = ((profile?.teachingLanguage ?? 'en') as Lang)
  const T = (key: Parameters<typeof i18nT>[1]) => i18nT(lang, key)
  const dateLocale = lang === 'ru' ? 'ru-RU' : lang === 'hi' ? 'hi-IN' : 'en-US'

  const xp = user?.xpPoints ?? 0
  const level = getLevel(xp, lang)
  const xpToNext = level.next ?? xp
  const xpProgress = level.next ? Math.min((xp / level.next) * 100, 100) : 100
  const streak = profile?.streakDays ?? 0
  const totalSessions = profile?.totalSessions ?? recentSessions.length
  const studyHours = Math.round(totalSessions * 0.75)
  const masteredTopics = profile?.masteredTopics ?? []
  const confusedTopics = profile?.confusedTopics ?? []

  const SLUG_ICON: Record<string, string> = { c: '⚙️', cpp: '🔷', python: '🐍', english: '🇬🇧', javascript: '🟨', typescript: '🔵', russian: '🇷🇺', java: '☕', csharp: 'C#', go: 'Go', rust: '⚙', ai: '🤖' }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>
      {/* Header */}
      <div style={{ background: 'rgba(13,17,23,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border-default)', padding: '0 20px', height: 60, display: 'flex', alignItems: 'center', gap: 12, position: 'sticky', top: 0, zIndex: 50 }}>
        <Link href="/dashboard" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 14 }}>← {T('progressx_back')}</Link>
        <span style={{ fontSize: 20 }}>📊</span>
        <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 16 }}>{T('progressx_title')}</span>
      </div>

      <main style={{ maxWidth: 800, margin: '0 auto', padding: '32px 20px' }}>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
          {[
            { label: T('progressx_lessons'), value: String(totalSessions), icon: '📚' },
            { label: T('progressx_study_hours'), value: String(studyHours), icon: '⏱' },
            { label: T('progressx_streak'), value: `${streak} 🔥`, icon: '' },
            { label: 'XP', value: String(xp), icon: '⭐' },
          ].map((s) => (
            <div key={s.label} style={{ padding: '16px 12px', borderRadius: 16, background: 'var(--bg-surface)', border: '1px solid var(--border-default)', textAlign: 'center' }}>
              <p style={{ fontSize: 22, fontWeight: 900, color: 'var(--text-primary)', marginBottom: 4 }}>{s.value}</p>
              <p style={{ fontSize: 11, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Level progress */}
        <div style={{ padding: 24, borderRadius: 20, background: 'var(--bg-surface)', border: '1px solid var(--border-default)', marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div>
              <span style={{ fontSize: 18, fontWeight: 900, color: level.color }}>{level.name}</span>
              <span style={{ fontSize: 13, color: 'var(--text-secondary)', marginLeft: 8 }}>{xp} XP</span>
            </div>
            {level.next && (
              <span style={{ fontSize: 12, color: 'var(--text-dim)' }}>{T('progressx_to_next_level')}: {level.next - xp} XP</span>
            )}
          </div>
          <div style={{ height: 8, borderRadius: 8, background: 'var(--bg-elevated, rgba(255,255,255,0.05))', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${xpProgress}%`, background: level.color, borderRadius: 8, transition: 'width 0.5s' }} />
          </div>
        </div>

        {/* Topic mastery */}
        <div style={{ padding: 24, borderRadius: 20, background: 'var(--bg-surface)', border: '1px solid var(--border-default)', marginBottom: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>{T('progressx_topics')}</h3>
          {masteredTopics.length === 0 && confusedTopics.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>{T('progressx_topics_empty')}</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {masteredTopics.length > 0 && (
                <div>
                  <p style={{ fontSize: 11, color: 'var(--text-dim)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{T('progressx_mastered')}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {masteredTopics.map((t) => (
                      <span key={t} style={{ padding: '4px 12px', borderRadius: 20, background: 'rgba(86,211,100,0.1)', border: '1px solid rgba(86,211,100,0.3)', color: '#56D364', fontSize: 13 }}>{t}</span>
                    ))}
                  </div>
                </div>
              )}
              {confusedTopics.length > 0 && (
                <div>
                  <p style={{ fontSize: 11, color: 'var(--text-dim)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{T('progressx_needs_review')}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {confusedTopics.map((t) => (
                      <span key={t} style={{ padding: '4px 12px', borderRadius: 20, background: 'rgba(247,129,102,0.1)', border: '1px solid rgba(247,129,102,0.3)', color: '#F78166', fontSize: 13 }}>{t}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Flashcards */}
        {flashcardsDue > 0 && (
          <div style={{ padding: 20, borderRadius: 20, background: 'rgba(121,192,255,0.06)', border: '1px solid rgba(121,192,255,0.2)', marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 14 }}>🃏 {T('progressx_flashcards_title')}</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 4 }}>{flashcardsDue} {T('progressx_flashcards_waiting')}</p>
            </div>
            <Link href="/flashcards" style={{ padding: '10px 20px', borderRadius: 12, background: '#79C0FF', color: '#0A0A0F', textDecoration: 'none', fontWeight: 700, fontSize: 13 }}>
              {T('progressx_review_btn')}
            </Link>
          </div>
        )}

        {/* Recent sessions */}
        <div style={{ borderRadius: 20, background: 'var(--bg-surface)', border: '1px solid var(--border-default)', overflow: 'hidden' }}>
          <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border-default)' }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>{T('progressx_history')}</h3>
          </div>
          {recentSessions.length === 0 ? (
            <div style={{ padding: '40px 24px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: 14 }}>{T('progressx_no_lessons')}</div>
          ) : (
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {recentSessions.map((s, i) => (
                <li key={s.id} style={{ padding: '14px 24px', borderBottom: i < recentSessions.length - 1 ? '1px solid var(--border-default)' : 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 20 }}>{SLUG_ICON[s.subject.slug] ?? '📘'}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{s.subject.name}</p>
                    <p style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 2 }}>
                      {new Date(s.startedAt).toLocaleDateString(dateLocale, { day: 'numeric', month: 'long' })}
                      {' · '}
                      {s._count.messages} {T('progressx_messages')}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  )
}
