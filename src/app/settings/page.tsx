'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useLanguage, LanguageToggle } from '@/components/ui/LanguageToggle'
import type { TeachingLang } from '@/lib/tts'

type VoiceOption = { key: string; label: string }
type LangOption = { key: TeachingLang; icon: string; label: string }

const LANG_OPTIONS: LangOption[] = [
  { key: 'ru', icon: '🇷🇺', label: 'Русский' },
  { key: 'en', icon: '🇬🇧', label: 'English' },
  { key: 'hi', icon: '🇮🇳', label: 'हिंदी' },
]

interface SettingsData {
  voiceId: string
  teachingLanguage: TeachingLang
  subscriptionStatus: string
  freeSessionUsed: boolean
}

export default function SettingsPage() {
  const { t, setLang } = useLanguage()

  const VOICE_OPTIONS: VoiceOption[] = [
    { key: 'male',   label: t('voice_male') },
    { key: 'female', label: t('voice_female') },
    { key: 'warm',   label: t('voice_warm') },
  ]
  const [data, setData] = useState<SettingsData | null>(null)
  const [voiceId, setVoiceId] = useState('male')
  const [teachingLanguage, setTeachingLang] = useState<TeachingLang>('ru')
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved'>('idle')
  const [portalLoading, setPortalLoading] = useState(false)
  const [upgradeLoading, setUpgradeLoading] = useState(false)

  useEffect(() => {
    fetch('/api/settings')
      .then((r) => r.json())
      .then((d: { success?: boolean; data?: SettingsData }) => {
        if (d.success && d.data) {
          setData(d.data)
          setVoiceId(d.data.voiceId)
          setTeachingLang(d.data.teachingLanguage)
        }
      })
      .catch(() => {})
  }, [])

  async function handleSave() {
    setSaveState('saving')
    try {
      const res = await fetch('/api/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ voiceId, teachingLanguage }),
      })
      const d = await res.json() as { success?: boolean }
      if (d.success) {
        setLang(teachingLanguage)
        setSaveState('saved')
        setTimeout(() => setSaveState('idle'), 2000)
      }
    } catch { setSaveState('idle') }
  }

  async function handlePortal() {
    setPortalLoading(true)
    try {
      const res = await fetch('/api/stripe/portal', { method: 'POST' })
      const d = await res.json() as { success?: boolean; url?: string }
      if (d.success && d.url) window.location.href = d.url
    } catch { /* ignore */ } finally { setPortalLoading(false) }
  }

  async function handleUpgrade() {
    setUpgradeLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', { method: 'POST' })
      const d = await res.json() as { success?: boolean; data?: { url?: string } }
      if (d.success && d.data?.url) window.location.href = d.data.url
    } catch { /* ignore */ } finally { setUpgradeLoading(false) }
  }

  const isPro = data?.subscriptionStatus === 'ACTIVE'

  return (
    <div className="min-h-screen" style={{ background: '#0A0A0F', color: '#fff' }}>

      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-white/[0.06]"
        style={{ background: 'rgba(10,10,15,0.85)', backdropFilter: 'blur(20px)' }}>
        <div className="max-w-2xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="text-sm font-medium transition-colors"
            style={{ color: '#52525B' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#fff' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#52525B' }}>
            {t('settings_back')}
          </Link>
          <LanguageToggle />
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-6 py-10 space-y-6">
        <h1 className="text-2xl font-black tracking-tight">{t('settings_title')}</h1>

        {/* Plan */}
        <Section label={t('settings_plan')}>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {isPro ? (
                <span className="px-3 py-1 rounded-full text-sm font-black"
                  style={{ background: 'linear-gradient(135deg, #F6B444, #E8913A)', color: '#fff' }}>
                  PRO
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full text-sm font-semibold"
                  style={{ background: 'rgba(255,255,255,0.07)', color: '#71717A' }}>
                  {t('settings_plan_free')}
                </span>
              )}
            </div>
            {isPro ? (
              <button
                onClick={handlePortal}
                disabled={portalLoading}
                className="px-4 py-2 rounded-xl text-sm font-semibold transition-all disabled:opacity-60"
                style={{ background: 'rgba(255,255,255,0.07)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}>
                {portalLoading ? '...' : t('settings_manage')}
              </button>
            ) : (
              <button
                onClick={handleUpgrade}
                disabled={upgradeLoading}
                className="px-4 py-2 rounded-xl text-sm font-bold transition-all disabled:opacity-60"
                style={{ background: 'var(--accent-primary)', color: '#fff' }}>
                {upgradeLoading ? '...' : t('settings_upgrade')}
              </button>
            )}
          </div>
        </Section>

        {/* Voice */}
        <Section label={t('settings_voice')}>
          <div className="grid grid-cols-3 gap-3">
            {VOICE_OPTIONS.map((v) => (
              <button key={v.key} onClick={() => setVoiceId(v.key)}
                className="py-3 rounded-xl text-sm font-semibold transition-all"
                style={{
                  background: voiceId === v.key ? 'rgba(247,129,102,0.12)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${voiceId === v.key ? 'var(--accent-primary)' : 'rgba(255,255,255,0.08)'}`,
                  color: voiceId === v.key ? 'var(--accent-primary)' : '#71717A',
                }}>
                {v.label}
              </button>
            ))}
          </div>
        </Section>

        {/* Teaching language */}
        <Section label={t('settings_lang')}>
          <div className="grid grid-cols-3 gap-3">
            {LANG_OPTIONS.map((l) => (
              <button key={l.key} onClick={() => setTeachingLang(l.key)}
                className="py-3 rounded-xl text-sm font-semibold transition-all flex flex-col items-center gap-1"
                style={{
                  background: teachingLanguage === l.key ? 'rgba(247,129,102,0.12)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${teachingLanguage === l.key ? 'var(--accent-primary)' : 'rgba(255,255,255,0.08)'}`,
                  color: teachingLanguage === l.key ? 'var(--accent-primary)' : '#71717A',
                }}>
                <span className="text-xl">{l.icon}</span>
                <span>{l.label}</span>
              </button>
            ))}
          </div>
        </Section>

        {/* Account */}
        <Section label={t('settings_account')}>
          <p className="text-sm" style={{ color: '#52525B' }}>
            {t('settings_account_desc')}
          </p>
        </Section>

        {/* Save */}
        <button
          onClick={handleSave}
          disabled={saveState === 'saving'}
          className="btn-primary w-full py-3.5 font-bold disabled:opacity-60">
          {saveState === 'saved' ? t('settings_saved') : saveState === 'saving' ? '...' : t('settings_save')}
        </button>
      </main>
    </div>
  )
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl p-5 border border-white/[0.07]" style={{ background: '#0F0F18' }}>
      <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: '#3F3F46' }}>{label}</p>
      {children}
    </div>
  )
}
