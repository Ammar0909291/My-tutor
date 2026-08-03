'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/components/ui/LanguageToggle'

interface Props {
  subjectSlug: string
  subjectName: string
}

export function RemoveSubjectButton({ subjectSlug, subjectName }: Props) {
  const router = useRouter()
  const { t } = useLanguage()
  const [loading, setLoading] = useState(false)

  async function handleRemove() {
    if (loading) return
    if (!window.confirm(t('rm_subject_confirm').replace('{name}', subjectName))) return
    setLoading(true)
    try {
      const res = await fetch('/api/subjects/unenroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subjectSlug }),
      })
      const data = await res.json()
      if (data.success) router.refresh()
      else setLoading(false)
    } catch {
      setLoading(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleRemove}
      disabled={loading}
      title={t('rm_subject_title')}
      aria-label={t('rm_subject_aria').replace('{name}', subjectName)}
      className="text-xs px-3 py-2 rounded-xl disabled:opacity-60"
      style={{ background: 'var(--candy-bg)', color: 'var(--candy-ink-soft)', fontWeight: 700, border: 'none', cursor: loading ? 'default' : 'pointer' }}
    >
      {loading ? '…' : '✕'}
    </button>
  )
}
