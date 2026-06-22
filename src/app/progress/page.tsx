import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { withRetry } from '@/lib/db/withRetry'
import Link from 'next/link'
import { t as i18nT, type Lang } from '@/lib/i18n'
import { CandyPage, Card, ProgressBar, Pill } from '@/components/ui/candy'

function getLevel(xp: number, lang: Lang) {
  if (xp >= 1001) return { name: i18nT(lang, 'level_master'),       color: '#FFC800', next: null }
  if (xp >= 601) return { name: i18nT(lang, 'level_expert'),        color: '#3B9EFF', next: 1001 }
  if (xp >= 301) return { name: i18nT(lang, 'level_practitioner'),  color: '#58CC02', next: 601 }
  if (xp >= 101) return { name: i18nT(lang, 'level_student'),       color: '#8B5CF6', next: 301 }
  return { name: i18nT(lang, 'level_novice'), color: '#8B8AA3', next: 101 }
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
    <CandyPage>
      {/* Header */}
      <div style={{ background: 'var(--candy-card)', borderBottom: '1px solid var(--candy-shadow)', padding: '0 20px', height: 60, display: 'flex', alignItems: 'center', gap: 12, position: 'sticky', top: 0, zIndex: 50 }}>
        <Link href="/dashboard" style={{ color: 'var(--candy-ink-soft)', textDecoration: 'none', fontSize: 14, fontWeight: 700 }}>← {T('progressx_back')}</Link>
        <span style={{ fontSize: 20 }}>📊</span>
        <span style={{ fontWeight: 800, color: 'var(--candy-ink)', fontSize: 16, fontFamily: 'var(--font-baloo2)' }}>{T('progressx_title')}</span>
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
            <Card key={s.label} style={{ padding: '16px 12px', textAlign: 'center' }}>
              <p style={{ fontSize: 22, fontWeight: 900, color: 'var(--candy-ink)', marginBottom: 4, fontFamily: 'var(--font-baloo2)' }}>{s.value}</p>
              <p style={{ fontSize: 11, color: 'var(--candy-ink-soft)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 700 }}>{s.label}</p>
            </Card>
          ))}
        </div>

        {/* Level progress */}
        <Card style={{ padding: 24, marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div>
              <span style={{ fontSize: 18, fontWeight: 900, color: level.color, fontFamily: 'var(--font-baloo2)' }}>{level.name}</span>
              <span style={{ fontSize: 13, color: 'var(--candy-ink-soft)', marginLeft: 8, fontWeight: 600 }}>{xp} XP</span>
            </div>
            {level.next && (
              <span style={{ fontSize: 12, color: 'var(--candy-ink-soft)', fontWeight: 600 }}>{T('progressx_to_next_level')}: {level.next - xp} XP</span>
            )}
          </div>
          <ProgressBar percent={xpProgress} height={10} fillColor={level.color} />
        </Card>

        {/* Topic mastery */}
        <Card style={{ padding: 24, marginBottom: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 800, color: 'var(--candy-ink)', marginBottom: 16, fontFamily: 'var(--font-baloo2)' }}>{T('progressx_topics')}</h3>
          {masteredTopics.length === 0 && confusedTopics.length === 0 ? (
            <p style={{ color: 'var(--candy-ink-soft)', fontSize: 14, fontWeight: 600 }}>{T('progressx_topics_empty')}</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {masteredTopics.length > 0 && (
                <div>
                  <p style={{ fontSize: 11, color: 'var(--candy-ink-soft)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 700 }}>{T('progressx_mastered')}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {masteredTopics.map((t) => (
                      <Pill key={t} color="rgba(88,204,2,0.14)" style={{ color: '#58CC02', fontSize: 13, padding: '4px 12px' }}>{t}</Pill>
                    ))}
                  </div>
                </div>
              )}
              {confusedTopics.length > 0 && (
                <div>
                  <p style={{ fontSize: 11, color: 'var(--candy-ink-soft)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 700 }}>{T('progressx_needs_review')}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {confusedTopics.map((t) => (
                      <Pill key={t} color="rgba(255,75,75,0.12)" style={{ color: '#FF4B4B', fontSize: 13, padding: '4px 12px' }}>{t}</Pill>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </Card>

        {/* Flashcards */}
        {flashcardsDue > 0 && (
          <Card style={{ padding: 20, marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontWeight: 800, color: 'var(--candy-ink)', fontSize: 14 }}>🃏 {T('progressx_flashcards_title')}</p>
              <p style={{ color: 'var(--candy-ink-soft)', fontSize: 13, marginTop: 4, fontWeight: 600 }}>{flashcardsDue} {T('progressx_flashcards_waiting')}</p>
            </div>
            <Link href="/flashcards" style={{ padding: '10px 20px', borderRadius: 12, background: 'var(--candy-blue)', color: '#fff', textDecoration: 'none', fontWeight: 800, fontSize: 13, boxShadow: '0 3px 0 var(--candy-blue-d)' }}>
              {T('progressx_review_btn')}
            </Link>
          </Card>
        )}

        {/* Recent sessions */}
        <Card style={{ overflow: 'hidden', padding: 0 }}>
          <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--candy-shadow)' }}>
            <h3 style={{ fontSize: 15, fontWeight: 800, color: 'var(--candy-ink)', fontFamily: 'var(--font-baloo2)' }}>{T('progressx_history')}</h3>
          </div>
          {recentSessions.length === 0 ? (
            <div style={{ padding: '40px 24px', textAlign: 'center', color: 'var(--candy-ink-soft)', fontSize: 14, fontWeight: 600 }}>{T('progressx_no_lessons')}</div>
          ) : (
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {recentSessions.map((s, i) => (
                <li key={s.id} style={{ borderBottom: i < recentSessions.length - 1 ? '1px solid var(--candy-shadow)' : 'none' }}>
                  <Link
                    href={`/progress/${s.id}`}
                    style={{ padding: '14px 24px', display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', cursor: 'pointer' }}
                  >
                    <span style={{ fontSize: 20 }}>{SLUG_ICON[s.subject.slug] ?? '📘'}</span>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--candy-ink)' }}>{s.subject.name}</p>
                      <p style={{ fontSize: 12, color: 'var(--candy-ink-soft)', marginTop: 2, fontWeight: 600 }}>
                        {new Date(s.startedAt).toLocaleDateString(dateLocale, { day: 'numeric', month: 'long' })}
                        {' · '}
                        {s._count.messages} {T('progressx_messages')}
                      </p>
                    </div>
                    <span style={{ color: 'var(--candy-ink-soft)', fontSize: 16 }}>→</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </main>
    </CandyPage>
  )
}
