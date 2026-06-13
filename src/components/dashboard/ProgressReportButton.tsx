'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FileText, X, ArrowRight } from 'lucide-react'
import { REPORT_WINDOW_META, type ReportWindow, type ProgressReport } from '@/lib/school/reports/progressReportTypes'

export function ProgressReportButton() {
  const [open, setOpen] = useState(false)
  const [window, setWindow] = useState<ReportWindow>('7d')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [report, setReport] = useState<ProgressReport | null>(null)

  async function load(w: ReportWindow) {
    setWindow(w)
    setLoading(true)
    setError(null)
    setReport(null)
    try {
      const r = await fetch('/api/school/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ window: w }),
      })
      const data = await r.json()
      if (data.error) { setError(data.error); return }
      setReport(data.report)
    } catch {
      setError('Could not generate report. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function openModal() {
    setOpen(true)
    load('7d')
  }

  function close() {
    setOpen(false)
    setReport(null)
    setError(null)
  }

  return (
    <>
      <button
        onClick={openModal}
        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold rounded-xl transition-transform hover:scale-[1.01]"
        style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', color: 'var(--text-primary)' }}
      >
        <FileText size={15} /> Generate Progress Report
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-5"
          style={{ background: 'rgba(0,0,0,0.55)' }}
          onClick={close}
        >
          <div
            className="w-full sm:max-w-lg max-h-[90vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl"
            style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 px-5 py-4" style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-default)' }}>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-black text-base" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
                  Progress Report
                </h2>
                <button onClick={close} className="p-1 rounded-lg" style={{ color: 'var(--text-secondary)' }}>
                  <X size={18} />
                </button>
              </div>
              {/* Window toggle */}
              <div className="flex gap-2">
                {(Object.keys(REPORT_WINDOW_META) as ReportWindow[]).map((w) => (
                  <button
                    key={w}
                    onClick={() => load(w)}
                    disabled={loading}
                    className="flex-1 py-2 rounded-lg text-xs font-bold transition-all disabled:opacity-50"
                    style={{
                      background: window === w ? 'var(--coral)' : 'var(--bg-elevated)',
                      color: window === w ? 'white' : 'var(--text-secondary)',
                      border: `1px solid ${window === w ? 'var(--coral)' : 'var(--border-default)'}`,
                    }}
                  >
                    {REPORT_WINDOW_META[w].label}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-5">
              {loading && (
                <div className="py-12 text-center">
                  <div className="w-9 h-9 rounded-full border-2 animate-spin mx-auto mb-3" style={{ borderColor: 'var(--coral)', borderTopColor: 'transparent' }} />
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Building your report…</p>
                </div>
              )}

              {error && !loading && (
                <div className="py-8 text-center">
                  <p className="text-sm mb-4" style={{ color: 'var(--coral)' }}>{error}</p>
                  <button onClick={() => load(window)} className="text-sm font-bold px-4 py-2 rounded-xl text-white" style={{ background: 'var(--coral)' }}>
                    Try again
                  </button>
                </div>
              )}

              {report && !loading && (
                <div className="space-y-5">
                  {/* Summary */}
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>{report.summaryText}</p>

                  {/* Learning Summary */}
                  {report.completedItems.length > 0 && (
                    <ReportSection title="📚 This week you worked on">
                      <ul className="space-y-1.5">
                        {report.completedItems.map((c, i) => (
                          <li key={i} className="text-sm flex gap-2" style={{ color: 'var(--text-primary)' }}>
                            <span style={{ color: 'var(--green)' }}>✓</span> {c}
                          </li>
                        ))}
                      </ul>
                    </ReportSection>
                  )}

                  {/* Strengths */}
                  {report.strengths.length > 0 && (
                    <ReportSection title="💪 Strengths">
                      <div className="flex flex-wrap gap-2">
                        {report.strengths.map((s, i) => (
                          <span key={i} className="text-xs font-semibold px-2.5 py-1 rounded-full"
                            style={{ background: 'var(--green-muted)', color: 'var(--green)' }}>{s}</span>
                        ))}
                      </div>
                    </ReportSection>
                  )}

                  {/* Areas to improve */}
                  {report.areasToImprove.length > 0 && (
                    <ReportSection title="🎯 Areas to improve">
                      <div className="flex flex-wrap gap-2">
                        {report.areasToImprove.map((a, i) => (
                          <span key={i} className="text-xs font-semibold px-2.5 py-1 rounded-full"
                            style={{ background: 'var(--yellow-muted)', color: 'var(--yellow)' }}>{a}</span>
                        ))}
                      </div>
                    </ReportSection>
                  )}

                  {/* Study habits */}
                  <ReportSection title="🔥 Study habits">
                    <div className="grid grid-cols-2 gap-3">
                      <HabitStat label="Current streak" value={`${report.studyHabits.currentStreak} days`} />
                      <HabitStat label="Best streak" value={`${report.studyHabits.longestStreak} days`} />
                      <HabitStat label="Assessments" value={String(report.studyHabits.assessmentsCompleted)} />
                      <HabitStat label="Practice sets" value={String(report.studyHabits.practiceCompleted)} />
                      {report.studyHabits.mocksCompleted > 0 && (
                        <HabitStat label="Mock tests" value={String(report.studyHabits.mocksCompleted)} />
                      )}
                      {report.studyHabits.recentAchievement && (
                        <HabitStat label="Latest badge" value={`${report.studyHabits.recentAchievement.icon} ${report.studyHabits.recentAchievement.title}`} />
                      )}
                    </div>
                  </ReportSection>

                  {/* Roadmap status (Sprint CK) */}
                  {report.roadmapStatus.length > 0 && (
                    <ReportSection title="🗺️ Roadmap status">
                      <ul className="space-y-1.5">
                        {report.roadmapStatus.map((r, i) => (
                          <li key={i} className="text-sm flex items-center justify-between" style={{ color: 'var(--text-primary)' }}>
                            <span>{r.subjectLabel}</span>
                            <span className="text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>
                              {r.completedCount} of {r.totalCount} chapters
                            </span>
                          </li>
                        ))}
                      </ul>
                    </ReportSection>
                  )}

                  {/* Recommendation */}
                  {report.recommendation && (
                    <ReportSection title="⭐ Recommended next step">
                      <div className="rounded-xl p-3" style={{ background: 'var(--coral-muted)', border: '1px solid var(--coral)' }}>
                        <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{report.recommendation.title}</p>
                        <p className="text-xs mt-0.5 mb-2" style={{ color: 'var(--text-secondary)' }}>{report.recommendation.reason}</p>
                        <Link href={report.recommendation.href} onClick={close}
                          className="inline-flex items-center gap-1.5 text-xs font-bold" style={{ color: 'var(--coral)', textDecoration: 'none' }}>
                          Start now <ArrowRight size={12} />
                        </Link>
                      </div>
                    </ReportSection>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function ReportSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-dim)' }}>{title}</h3>
      {children}
    </div>
  )
}

function HabitStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl p-3" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)' }}>
      <p className="text-sm font-black" style={{ color: 'var(--text-primary)' }}>{value}</p>
      <p className="text-[11px]" style={{ color: 'var(--text-dim)' }}>{label}</p>
    </div>
  )
}
