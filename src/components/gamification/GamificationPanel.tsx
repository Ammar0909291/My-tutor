'use client'

import { useEffect, useState } from 'react'

interface Props {
  variant?: string
  [key: string]: unknown
}

interface GamData {
  xpPoints: number
  streakDays: number
  level: { name: string; color: string; next: number | null }
  totalSessions: number
}

function getLevel(xp: number): { name: string; color: string; next: number | null } {
  if (xp >= 1001) return { name: 'Master',       color: '#F6B444', next: null }
  if (xp >= 601)  return { name: 'Expert',        color: '#79C0FF', next: 1001 }
  if (xp >= 301)  return { name: 'Practitioner',  color: '#56D364', next: 601 }
  if (xp >= 101)  return { name: 'Student',       color: '#A78BFA', next: 301 }
  return                 { name: 'Novice',         color: '#71717A', next: 101 }
}

export default function GamificationPanel(_props: Props) {
  const [data, setData] = useState<GamData | null>(null)

  useEffect(() => {
    fetch('/api/user/profile')
      .then((r) => r.json())
      .then((res) => {
        const user = res.user
        if (!user) return
        const xp = user.xpPoints ?? 0
        setData({
          xpPoints: xp,
          streakDays: user.profile?.streakDays ?? 0,
          level: getLevel(xp),
          totalSessions: user._count?.learnSessions ?? 0,
        })
      })
      .catch(() => {})
  }, [])

  if (!data) return null

  const { xpPoints, streakDays, level, totalSessions } = data
  const xpProgress = level.next ? Math.round((xpPoints / level.next) * 100) : 100
  const prevThreshold = xpPoints >= 1001 ? 601 : xpPoints >= 601 ? 301 : xpPoints >= 301 ? 101 : 0
  const xpInLevel = xpPoints - prevThreshold
  const xpToNext = level.next ? level.next - prevThreshold : 1

  return (
    <div
      className="rounded-2xl p-5 space-y-4"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}
    >
      <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
        Progress & Achievements
      </h3>

      {/* Level + XP bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium" style={{ color: level.color }}>
            {level.name}
          </span>
          <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            {xpPoints} XP{level.next ? ` / ${level.next}` : ' · Max level'}
          </span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--border-subtle)' }}>
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${xpProgress}%`, background: level.color }}
          />
        </div>
        {level.next && (
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            {xpInLevel} / {xpToNext} XP to {level.name === 'Novice' ? 'Student' : level.name === 'Student' ? 'Practitioner' : level.name === 'Practitioner' ? 'Expert' : 'Master'}
          </p>
        )}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: '🔥', label: 'Streak', value: `${streakDays}d` },
          { icon: '⚡', label: 'Total XP', value: xpPoints.toLocaleString() },
          { icon: '📚', label: 'Sessions', value: totalSessions.toLocaleString() },
        ].map(({ icon, label, value }) => (
          <div
            key={label}
            className="rounded-xl p-3 text-center"
            style={{ background: 'var(--bg-base)', border: '1px solid var(--border-subtle)' }}
          >
            <div className="text-xl mb-1">{icon}</div>
            <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{value}</div>
            <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Streak encouragement */}
      {streakDays > 0 && (
        <div
          className="rounded-xl px-4 py-3 text-sm"
          style={{ background: '#F6B44415', border: '1px solid #F6B44430', color: '#F6B444' }}
        >
          🔥 {streakDays}-day streak! Keep it up.
        </div>
      )}
    </div>
  )
}

export { GamificationPanel }
