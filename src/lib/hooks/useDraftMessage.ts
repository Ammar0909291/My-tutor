'use client'
import { useState, useEffect } from 'react'

export function useDraftMessage(key: string | null, _value?: string, onRestore?: (val: string) => void) {
  const [draft, setDraft] = useState('')

  useEffect(() => {
    if (!key) return
    const stored = sessionStorage.getItem(`draft:${key}`)
    if (stored && onRestore) onRestore(stored)
    if (stored) setDraft(stored)
  }, [key]) // eslint-disable-line react-hooks/exhaustive-deps

  function saveDraft(value: string) {
    setDraft(value)
    if (key) sessionStorage.setItem(`draft:${key}`, value)
  }

  function clearDraftLocal() {
    setDraft('')
    if (key) sessionStorage.removeItem(`draft:${key}`)
  }

  return { draft, saveDraft, clearDraft: clearDraftLocal }
}

export function clearDraft(key: string): void {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(`draft:${key}`)
  }
}
