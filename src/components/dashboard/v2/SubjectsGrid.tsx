'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { SectionTitle, ProgressBar } from '@/components/ui/candy'
import styles from './dashboard.module.css'
import type { SubjectCardData } from './types'

interface SubjectsGridProps {
  subjects: SubjectCardData[]
}

export function SubjectsGrid({ subjects }: SubjectsGridProps) {
  const router = useRouter()
  const [removingSlug, setRemovingSlug] = useState<string | null>(null)

  if (subjects.length === 0) return null

  async function removeSubject(slug: string, name: string) {
    if (!window.confirm(`Remove ${name} from your subjects? Your progress is kept — you can add it back anytime.`)) return
    setRemovingSlug(slug)
    try {
      const res = await fetch('/api/subjects/unenroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subjectSlug: slug }),
      })
      const data = await res.json()
      if (data.success) router.refresh()
      else setRemovingSlug(null)
    } catch {
      setRemovingSlug(null)
    }
  }

  return (
    <div className={styles['subjects-section']}>
      <SectionTitle>📚 My Subjects</SectionTitle>
      <div className={styles['subjects-grid-new']}>
        {subjects.map((s) => (
          <div key={s.slug} className={styles['subject-card-new']} style={{ position: 'relative' }}>
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); removeSubject(s.slug, s.name) }}
              disabled={removingSlug === s.slug}
              aria-label={`Remove ${s.name}`}
              title="Remove subject"
              style={{
                position: 'absolute', top: 8, right: 8, zIndex: 1,
                width: 24, height: 24, borderRadius: '50%', border: 'none',
                background: 'rgba(0,0,0,0.35)', color: '#fff', fontSize: 14, lineHeight: 1,
                cursor: removingSlug === s.slug ? 'default' : 'pointer',
                opacity: removingSlug === s.slug ? 0.5 : 1,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              ✕
            </button>
            <Link href={s.href} className={styles['subject-card-link'] ?? ''} style={{ display: 'block' }}>
              <span className={styles['subject-card-strip']} style={{ background: s.color }} />
              <div className={styles['subject-card-body']}>
                <div className={styles['subject-card-top']}>
                  <div className={styles['subject-icon-lg']} style={{ background: s.bgColor }}>
                    {s.icon}
                  </div>
                  <div className={styles['subject-card-info']}>
                    <div className={styles['subject-card-name']}>{s.name}</div>
                    <div className={styles['subject-card-lesson']}>
                      {s.lastLessonTitle ?? `Lesson ${s.currentLesson}`}
                    </div>
                  </div>
                </div>
                <div className={styles['subject-card-bottom']}>
                  <div className={styles['subject-pct-row']}>
                    <span className={styles['subject-pct-label']}>Progress</span>
                    <span className={styles['subject-pct-val']} style={{ color: s.color }}>
                      {s.completionPercent}%
                    </span>
                  </div>
                  <ProgressBar
                    percent={s.completionPercent}
                    height={12}
                    borderRadius={6}
                    fillColor={s.color}
                    animated={true}
                  />
                </div>
              </div>
            </Link>
          </div>
        ))}
        <Link href="/library" className={styles['subjects-add-new']}>
          ＋ Add a subject
        </Link>
      </div>
    </div>
  )
}
