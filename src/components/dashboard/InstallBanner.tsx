'use client'
import { useEffect, useState } from 'react'
import { useLanguage } from '@/components/ui/LanguageToggle'

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function InstallBanner() {
  const { t } = useLanguage()
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('pwa-dismissed')) { setDismissed(true); return }
    const handler = (e: Event) => {
      e.preventDefault()
      setPrompt(e as BeforeInstallPromptEvent)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  if (!prompt || dismissed) return null

  async function handleInstall() {
    if (!prompt) return
    await prompt.prompt()
    const { outcome } = await prompt.userChoice
    if (outcome === 'accepted' || outcome === 'dismissed') {
      setPrompt(null)
      setDismissed(true)
    }
  }

  function handleDismiss() {
    setDismissed(true)
    localStorage.setItem('pwa-dismissed', '1')
  }

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '12px',
      padding: '12px 16px', borderRadius: '14px', marginBottom: '16px',
      background: 'linear-gradient(135deg, rgba(247,129,102,0.15), rgba(247,129,102,0.05))',
      border: '1px solid rgba(247,129,102,0.25)',
    }}>
      <span style={{ fontSize: 20 }}>📱</span>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
          {t('pwa_install')}
        </p>
        <p style={{ fontSize: 11, color: 'var(--text-secondary)', margin: 0 }}>
          {t('pwa_install_sub')}
        </p>
      </div>
      <button onClick={handleInstall}
        style={{ padding: '6px 14px', borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 700, background: 'var(--accent-primary)', color: '#fff' }}>
        {t('pwa_install_btn')}
      </button>
      <button onClick={handleDismiss}
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dim)', fontSize: 16, padding: 4 }}>
        ✕
      </button>
    </div>
  )
}
