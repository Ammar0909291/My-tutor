import Link from 'next/link'
import { SectionTitle, ProgressBar } from '@/components/ui/candy'
import styles from './dashboard.module.css'
import type { SubjectCardData } from './types'

interface SubjectsGridProps {
  subjects: SubjectCardData[]
}

export function SubjectsGrid({ subjects }: SubjectsGridProps) {
  if (subjects.length === 0) return null

  return (
    <div className={styles['subjects-section']}>
      <SectionTitle>📚 My Subjects</SectionTitle>
      <div className={styles['subjects-grid-new']}>
        {subjects.map((s) => (
          <Link key={s.slug} href={s.href} className={styles['subject-card-new']}>
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
        ))}
        <Link href="/library" className={styles['subjects-add-new']}>
          ＋ Add a subject
        </Link>
      </div>
    </div>
  )
}
