'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check, Loader2 } from 'lucide-react'
import { CandyButton, useConfetti } from '@/components/ui/candy'
import tokenStyles from '@/components/ui/candy/tokens.module.css'

/**
 * School Sprint A: restyled onto CandyButton to match Dashboard V2 /
 * Lesson Experience. Same fetch/state logic as before — presentation only.
 */
export function MarkChapterCompleteButton({ subject, chapterId }: { subject: string; chapterId: string }) {
  const router = useRouter()
  const [state, setState] = useState<'idle' | 'saving' | 'done' | 'error'>('idle')
  const fireConfetti = useConfetti()

  async function handleClick() {
    setState('saving')
    try {
      const res = await fetch('/api/school/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, chapterId, action: 'complete' }),
      })
      const d = await res.json()
      if (d.success) {
        setState('done')
        fireConfetti()
        router.refresh()
      } else {
        setState('error')
      }
    } catch {
      setState('error')
    }
  }

  const done = state === 'done'
  const saving = state === 'saving'

  return (
    <span className={`${tokenStyles.candyTheme} w-full sm:w-auto`} style={{ display: 'inline-block' }}>
      <CandyButton onClick={handleClick} disabled={saving || done}
        depth={done ? 2 : 3} activeDepth={1}
        className="w-full sm:w-auto"
        shadowColor={done ? 'var(--candy-green-d)' : state === 'error' ? 'var(--candy-red)' : 'var(--candy-shadow)'}
        style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          padding: '13px 24px', borderRadius: 14, fontSize: 13, fontWeight: 800,
          background: done ? 'var(--candy-green)' : 'var(--candy-card)',
          color: done ? '#fff' : 'var(--candy-ink)',
          border: done ? 'none' : '1px solid var(--candy-shadow)',
          opacity: saving ? 0.7 : 1,
        }}>
        {saving ? <Loader2 size={15} className="animate-spin" /> : <Check size={15} />}
        {done ? 'Completed!' : saving ? 'Saving…' : state === 'error' ? 'Failed — tap to retry' : 'Mark as complete'}
      </CandyButton>
    </span>
  )
}
