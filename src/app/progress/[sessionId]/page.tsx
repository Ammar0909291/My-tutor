import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { withRetry } from '@/lib/db/withRetry'
import { MessageRole } from '@prisma/client'
import { t as i18nT, type Lang } from '@/lib/i18n'
import { CandyPage, Card } from '@/components/ui/candy'

export default async function SessionDetailPage({ params }: { params: { sessionId: string } }) {
  const session = await auth()
  if (!session?.user?.id) redirect('/auth/login')

  const userId = session.user.id

  const [learnSession, profile] = await withRetry(() => Promise.all([
    prisma.learnSession.findUnique({
      where: { id: params.sessionId, userId },
      include: {
        subject: { select: { name: true, slug: true } },
        messages: { orderBy: { createdAt: 'asc' } },
      },
    }),
    prisma.profile.findUnique({ where: { userId }, select: { teachingLanguage: true } }),
  ]))

  if (!learnSession) notFound()

  const lang = ((profile?.teachingLanguage ?? 'en') as Lang)
  const T = (key: Parameters<typeof i18nT>[1]) => i18nT(lang, key)
  const dateLocale = lang === 'ru' ? 'ru-RU' : lang === 'hi' ? 'hi-IN' : 'en-US'
  const studentLabel = T('learn_label_student')
  const tutorLabel = T('learn_label_tutor')

  return (
    <CandyPage>
      <div style={{ background: 'var(--candy-card)', borderBottom: '1px solid var(--candy-shadow)', padding: '0 20px', height: 60, display: 'flex', alignItems: 'center', gap: 12, position: 'sticky', top: 0, zIndex: 50 }}>
        <Link href="/progress" style={{ color: 'var(--candy-ink-soft)', textDecoration: 'none', fontSize: 14, fontWeight: 700 }}>← {T('progressx_back')}</Link>
        <span style={{ fontWeight: 800, color: 'var(--candy-ink)', fontSize: 16, fontFamily: 'var(--font-baloo2)' }}>{learnSession.subject.name}</span>
      </div>

      <main style={{ maxWidth: 700, margin: '0 auto', padding: '32px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <p style={{ fontSize: 13, color: 'var(--candy-ink-soft)', fontWeight: 600 }}>
            {new Date(learnSession.startedAt).toLocaleDateString(dateLocale, { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
          <Link
            href={`/learn?subject=${learnSession.subject.slug}`}
            style={{ padding: '10px 20px', borderRadius: 12, background: 'var(--candy-blue)', color: '#fff', textDecoration: 'none', fontWeight: 800, fontSize: 13, boxShadow: '0 3px 0 var(--candy-blue-d)' }}
          >
            Continue this lesson
          </Link>
        </div>

        {learnSession.summary && (
          <Card style={{ padding: 20, marginBottom: 20 }}>
            <p style={{ fontSize: 12, color: 'var(--candy-ink-soft)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 700, marginBottom: 8 }}>Summary</p>
            <p style={{ fontSize: 14, color: 'var(--candy-ink)', fontWeight: 600, lineHeight: 1.5 }}>{learnSession.summary}</p>
          </Card>
        )}

        <Card style={{ padding: 0, overflow: 'hidden' }}>
          {learnSession.messages.length === 0 ? (
            <div style={{ padding: '40px 24px', textAlign: 'center', color: 'var(--candy-ink-soft)', fontSize: 14, fontWeight: 600 }}>{T('progressx_no_lessons')}</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 24 }}>
              {learnSession.messages.map((m) => {
                const isUser = m.role === MessageRole.USER
                return (
                  <div key={m.id} style={{ display: 'flex', flexDirection: 'column', alignItems: isUser ? 'flex-end' : 'flex-start' }}>
                    <p style={{ fontSize: 11, color: 'var(--candy-ink-soft)', fontWeight: 700, marginBottom: 4 }}>{isUser ? studentLabel : tutorLabel}</p>
                    <div style={{
                      maxWidth: '80%',
                      padding: '10px 14px',
                      borderRadius: 14,
                      background: isUser ? 'var(--candy-blue)' : 'var(--candy-bg)',
                      color: isUser ? '#fff' : 'var(--candy-ink)',
                      fontSize: 14,
                      fontWeight: 500,
                      whiteSpace: 'pre-wrap',
                    }}>
                      {m.content}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </Card>
      </main>
    </CandyPage>
  )
}
