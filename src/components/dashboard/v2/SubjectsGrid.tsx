import Link from 'next/link'
import { Card, SectionTitle, ProgressBar } from '@/components/ui/candy'
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
      <div className={styles['subjects-grid']}>
        {subjects.map((s) => (
          <Link key={s.slug} href={s.href} className={styles['subject-card']} style={{ textDecoration: 'none' }}>
            <Card className={styles['subject-card-inner']}>
              <div className={styles['subject-icon']} style={{ background: s.bgColor }}>
                {s.icon}
              </div>
              <div className={styles['subject-info']}>
                <div className={styles['subject-name']}>{s.name}</div>
                <div className={styles['subject-lesson']}>
                  {s.lastLessonTitle ?? `Lesson ${s.currentLesson}`}
                </div>
              </div>
              <div className={styles['subject-pct']} style={{ color: s.color }}>
                {s.completionPercent}%
              </div>
              <ProgressBar
                percent={s.completionPercent}
                height={8}
                borderRadius={4}
                fillColor={s.color}
                animated={false}
                className={styles['subject-bar']}
              />
            </Card>
          </Link>
        ))}
      </div>
      <Link href="/library" className={styles['subjects-add']}>
        + Add subject
      </Link>
    </div>
  )
}
