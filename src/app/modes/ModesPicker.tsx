'use client'

import { useRouter } from 'next/navigation'
import { Card, CandyButton, CandyPage, EagleMascot } from '@/components/ui/candy'

interface BoardOption {
  id: string
  shortName: string
  grades: number[]
}

interface Props {
  hasSchoolAccess: boolean
  currentBoard: string | null
  currentGrade: number | null
  boards: BoardOption[]
}

// School Mode entry point intentionally hidden from the UI (presentation-layer
// only — School Mode routes/APIs/logic are untouched and remain reachable by
// direct URL for already-enrolled users).
export default function ModesPicker(_props: Props) {
  const router = useRouter()

  return (
    <CandyPage style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 16px' }}>
      <EagleMascot variant="logo" size={56} />
      <h1 style={{ fontFamily: 'var(--font-baloo2)', fontWeight: 800, fontSize: 26, color: 'var(--candy-ink)', margin: '12px 0 4px' }}>
        Choose Your Learning Mode
      </h1>
      <p style={{ color: 'var(--candy-ink-soft)', fontSize: 14, marginBottom: 28, textAlign: 'center', maxWidth: 420 }}>
        Switch freely between modes, boards, and grades anytime. Each combination keeps its own progress.
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
      </div>
    </CandyPage>
  )
}
