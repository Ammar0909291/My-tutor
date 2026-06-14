'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check } from 'lucide-react'

export function MarkChapterCompleteButton({ subject, chapterId }: { subject: string; chapterId: string }) {
  const router = useRouter()
  const [state, setState] = useState<'idle' | 'saving' | 'done' | 'error'>('idle')

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
        router.refresh()
      } else {
        setState('error')
      }
    } catch {
      setState('error')
    }
  }

  return (
    <button onClick={handleClick} disabled={state === 'saving' || state === 'done'}
      className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 text-sm font-bold rounded-xl transition-all disabled:opacity-60"
      style={{
        background: state === 'done' ? 'var(--green-muted)' : 'var(--bg-elevated)',
        border: `1px solid ${state === 'done' ? 'var(--green)' : 'var(--border-default)'}`,
        color: state === 'done' ? 'var(--green)' : 'var(--text-primary)',
      }}>
      <Check size={15} />
      {state === 'done' ? 'Completed!' : state === 'saving' ? 'Saving…' : state === 'error' ? 'Failed — tap to retry' : 'Mark as complete'}
    </button>
  )
}
