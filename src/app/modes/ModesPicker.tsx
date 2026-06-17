'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CandyButton, CandyPage, EagleMascot } from '@/components/ui/candy'

interface BoardOption {
  id: string
  shortName: string
  grades: number[]
}

interface Props {
  hasSchoolAccess: boolean
  boards: BoardOption[]
}

export default function ModesPicker({ hasSchoolAccess, boards }: Props) {
  const router = useRouter()
  const [showPicker, setShowPicker] = useState(false)
  const [boardId, setBoardId] = useState(boards[0]?.id ?? '')
  const [grade, setGrade] = useState<number | ''>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const selectedBoard = boards.find((b) => b.id === boardId)

  async function enterSchoolMode() {
    if (hasSchoolAccess) {
      router.push('/dashboard?mode=school')
      return
    }
    if (!grade) {
      setError('Please select a grade')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/profile/school-mode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ board: boardId, grade }),
      })
      const data = await res.json()
      if (!data.success) {
        setError(data.error ?? 'Something went wrong')
        setLoading(false)
        return
      }
      router.push('/dashboard?mode=school')
    } catch {
      setError('Something went wrong')
      setLoading(false)
    }
  }

  return (
    <CandyPage style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 16px' }}>
      <EagleMascot variant="logo" size={56} />
      <h1 style={{ fontFamily: 'var(--font-baloo2)', fontWeight: 800, fontSize: 26, color: 'var(--candy-ink)', margin: '12px 0 4px' }}>
        Choose Your Learning Mode
      </h1>
      <p style={{ color: 'var(--candy-ink-soft)', fontSize: 14, marginBottom: 28, textAlign: 'center', maxWidth: 420 }}>
        Switch freely between modes anytime. Each keeps its own progress and recommendations.
      </p>

      <div style={{ display: 'grid', gap: 16, width: '100%', maxWidth: 420 }}>
        <Card style={{ padding: 20 }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>📚</div>
          <div style={{ fontWeight: 800, fontSize: 18, color: 'var(--candy-ink)' }}>Library Mode</div>
          <p style={{ color: 'var(--candy-ink-soft)', fontSize: 13, margin: '4px 0 14px' }}>
            Self-paced subjects, AI tutor, quizzes, leagues — your general library curriculum.
          </p>
          <CandyButton
            onClick={() => router.push('/dashboard?mode=library')}
            shadowColor="var(--candy-blue-d, #1B7EEF)"
            style={{ width: '100%', background: 'var(--candy-blue, #3B9EFF)', color: '#fff', fontWeight: 800, padding: '12px 0', borderRadius: 14 }}
          >
            Enter Library Mode
          </CandyButton>
        </Card>

        <Card style={{ padding: 20 }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>🎒</div>
          <div style={{ fontWeight: 800, fontSize: 18, color: 'var(--candy-ink)' }}>School Mode</div>
          <p style={{ color: 'var(--candy-ink-soft)', fontSize: 13, margin: '4px 0 14px' }}>
            Board-aligned chapters, exams, mock tests, and exam readiness for your grade.
          </p>

          {!hasSchoolAccess && showPicker && (
            <div style={{ marginBottom: 14, display: 'grid', gap: 10 }}>
              <select
                value={boardId}
                onChange={(e) => { setBoardId(e.target.value); setGrade('') }}
                style={{ padding: '10px 12px', borderRadius: 10, border: '2px solid var(--candy-shadow)', fontWeight: 700 }}
              >
                {boards.map((b) => (
                  <option key={b.id} value={b.id}>{b.shortName}</option>
                ))}
              </select>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value ? Number(e.target.value) : '')}
                style={{ padding: '10px 12px', borderRadius: 10, border: '2px solid var(--candy-shadow)', fontWeight: 700 }}
              >
                <option value="">Select grade</option>
                {selectedBoard?.grades.map((g) => (
                  <option key={g} value={g}>Class {g}</option>
                ))}
              </select>
              {error && <div style={{ color: 'var(--candy-red, #FF4B4B)', fontSize: 12, fontWeight: 700 }}>{error}</div>}
            </div>
          )}

          <CandyButton
            onClick={() => (hasSchoolAccess || showPicker ? enterSchoolMode() : setShowPicker(true))}
            disabled={loading}
            shadowColor="var(--candy-green-d, #2E9B00)"
            style={{ width: '100%', background: 'var(--candy-green, #58CC02)', color: '#fff', fontWeight: 800, padding: '12px 0', borderRadius: 14, opacity: loading ? 0.6 : 1 }}
          >
            {loading ? 'Setting up…' : hasSchoolAccess ? 'Enter School Mode' : showPicker ? 'Confirm & Enter' : 'Enter School Mode'}
          </CandyButton>
        </Card>
      </div>
    </CandyPage>
  )
}
