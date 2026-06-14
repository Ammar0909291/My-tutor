import Link from 'next/link'
import { Award, Trophy, Target } from 'lucide-react'
import { t as i18nT, type Lang } from '@/lib/i18n'

interface SubjectProgressItem {
  slug: string
  name: string
  icon: string
  color: string
}

export interface DashboardMilestone {
  type: 'assessment' | 'continue' | 'start'
  subjectSlug: string
  subjectName: string
  completionPercent?: number
}

interface Props {
  lang: Lang
  subjectsCompletedCount: number
  certificatesEarnedCount: number
  subjects: (SubjectProgressItem & { completionPercent: number; isCompleted: boolean })[]
  milestone: DashboardMilestone | null
}

/**
 * Sprint N — TASK 7: Dashboard rollup of learning progression.
 * Shows subjects completed, certificates earned, per-subject progress
 * bars, and a single "next milestone" suggestion.
 */
export default function ProgressSummaryPanel({ lang, subjectsCompletedCount, certificatesEarnedCount, subjects, milestone }: Props) {
  const T = (key: Parameters<typeof i18nT>[1]) => i18nT(lang, key)

  if (subjects.length === 0) return null

  return (
    <div className="rounded-2xl p-6" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)' }}>
      <h3 className="text-base font-black mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
        {T('dash_progress_title')}
      </h3>

      {/* Count chips */}
      <div className="flex gap-3 flex-wrap mb-5">
        <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl" style={{ background: 'rgba(86,211,100,0.08)', border: '1px solid rgba(86,211,100,0.2)', flex: '1 1 140px' }}>
          <Trophy size={16} color="#56D364" />
          <div>
            <div className="text-lg font-black" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>{subjectsCompletedCount}</div>
            <div className="text-[10px]" style={{ color: 'var(--text-dim)' }}>{T('dash_subjects_completed')}</div>
          </div>
        </div>
        <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl" style={{ background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.2)', flex: '1 1 140px' }}>
          <Award size={16} color="#A78BFA" />
          <div>
            <div className="text-lg font-black" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>{certificatesEarnedCount}</div>
            <div className="text-[10px]" style={{ color: 'var(--text-dim)' }}>{T('dash_certificates_earned')}</div>
          </div>
        </div>
      </div>

      {/* Current progress per subject */}
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-wider mb-2.5" style={{ color: 'var(--text-dim)' }}>{T('dash_current_progress')}</p>
        <div className="space-y-2.5">
          {subjects.map((s) => (
            <Link key={s.slug} href={`/learn?subject=${s.slug}`} className="flex items-center gap-3" style={{ textDecoration: 'none' }}>
              <span className="text-base shrink-0">{s.icon}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xs font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{s.name}</span>
                  <span className="text-[10px] font-mono shrink-0" style={{ color: s.isCompleted ? '#56D364' : s.color }}>
                    {s.isCompleted ? '✅ 100%' : `${s.completionPercent}%`}
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
                  <div className="h-full rounded-full" style={{ width: `${Math.min(100, Math.max(0, s.completionPercent))}%`, background: s.isCompleted ? '#56D364' : s.color }} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Next milestone */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider mb-2.5" style={{ color: 'var(--text-dim)' }}>{T('dash_next_milestone')}</p>
        {milestone ? (
          <Link href={`/learn?subject=${milestone.subjectSlug}`} className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
            style={{ background: 'rgba(247,129,102,0.08)', border: '1px solid rgba(247,129,102,0.2)', textDecoration: 'none' }}>
            <Target size={16} color="#F78166" className="shrink-0" />
            <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
              {milestone.type === 'assessment' && `🏆 ${T('take_final_assessment')}: ${milestone.subjectName}`}
              {milestone.type === 'continue' && `📘 ${T('dash_milestone_continue')}: ${milestone.subjectName} (${milestone.completionPercent}%)`}
              {milestone.type === 'start' && `🚀 ${T('dash_milestone_start')}: ${milestone.subjectName}`}
            </span>
          </Link>
        ) : (
          <p className="text-xs" style={{ color: 'var(--text-dim)' }}>{T('dash_no_milestone')}</p>
        )}
      </div>
    </div>
  )
}
